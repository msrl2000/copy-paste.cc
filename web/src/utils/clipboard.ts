import { mimeToExtension } from './file.js';

/**
 * Reads the user clipboard and converts its content to an array of File objects.
 *
 * This mimics the behaviour of the native browser paste event handler that is
 * used in Home.tsx.  It supports arbitrary clipboard data:
 *  – Files / images copied from the OS or another website.
 *  – Plain-text (converted to `clipboard.txt`).
 *
 * The function relies on the async Clipboard API (`navigator.clipboard.read`).
 * If it is not available it gracefully falls back to `navigator.clipboard.readText`.
 */
export async function readClipboardFiles(): Promise<File[]> {
  const files: File[] = [];

  if (!('clipboard' in navigator)) {
    return files;
  }

  // Modern async Clipboard API – gives us ClipboardItem objects.
  if ('read' in navigator.clipboard) {
    try {
      const items = await (navigator.clipboard as any).read();

      for (const item of items) {
        let handled = false;

        // First, iterate over all declared MIME types.
        for (const type of item.types) {
          try {
            const blob: Blob = await item.getType(type);

            if (type === 'text/plain') {
              const text = await blob.text();
              files.push(
                new File([text], 'clipboard.txt', { type: 'text/plain' })
              );
            } else {
              const ext = mimeToExtension(blob.type) || '.bin';
              files.push(new File([blob], `clipboard${ext}`, { type: blob.type }));
            }

            handled = true;
          } catch {
            // Some types might not be retrievable – ignore and try others.
          }
        }

        if (!handled) {
          // Try generic binary type as a last resort (helps for .exe, .msi, etc.).
          try {
            const blob: Blob = await item.getType('application/octet-stream');
            const ext = '.bin';
            files.push(new File([blob], `clipboard${ext}`, { type: blob.type }));
          } catch {
            // Still nothing – give up on this item.
          }
        }
      }

      if (files.length) {
        return files;
      }
    } catch {
      // Fall through to readText fallback.
    }
  }

  // Fallback – plain-text only.
  if ('readText' in navigator.clipboard) {
    try {
      const text = await (navigator.clipboard as any).readText();
      if (text) {
        files.push(new File([text], 'clipboard.txt', { type: 'text/plain' }));
      }
    } catch {}
  }

  // If previous methods produced nothing, try legacy paste fallback.
  if (files.length === 0) {
    try {
      const pasted = await readViaPasteEvent();
      if (pasted.length) {
        files.push(...pasted);
      }
    } catch {}
  }

  return files;
}

// --- Fallback for native OS file copies ----------------------------------

async function readViaPasteEvent(): Promise<File[]> {
  return new Promise<File[]>(resolve => {
    const files: File[] = [];

    // Create an off-screen, invisible paste target.
    const textarea = document.createElement('textarea');
    textarea.setAttribute('aria-hidden', 'true');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();

    const remove = () => {
      document.removeEventListener('paste', onPaste, true);
      document.body.removeChild(textarea);
      resolve(files);
    };

    const onPaste = (e: ClipboardEvent) => {
      try {
        const dt = e.clipboardData;
        if (dt) {
          for (const item of dt.items) {
            if (item.kind === 'file') {
              const file = item.getAsFile();
              if (file) {
                files.push(file);
              }
            } else if (item.kind === 'string' && item.type === 'text/plain') {
              item.getAsString(str => {
                files.push(
                  new File([str], 'clipboard.txt', { type: 'text/plain' })
                );
                remove();
              });
              e.preventDefault();
              return; // exit early; remove will resolve.
            }
          }
        }
      } catch {}
      e.preventDefault();
      remove();
    };

    document.addEventListener('paste', onPaste, true);

    // Trigger the paste command (only works inside a user-gesture).
    const ok = document.execCommand?.('paste');

    // If execCommand is not supported or denied, clean up shortly.
    if (!ok) {
      setTimeout(remove, 50);
    }
  });
} 