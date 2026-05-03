"use client";
import { useEffect, useRef } from "react";

export default function ProtectedImage({ src, alt, className, ...props }) {
  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    // Prevent right-click context menu
    const preventContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Prevent drag and drop
    const preventDragStart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Prevent drag over
    const preventDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Prevent text selection
    const preventSelect = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Prevent keyboard shortcuts (Ctrl+S, Ctrl+U, etc.)
    const preventKeyboard = (e) => {
      // Prevent Ctrl+S, Ctrl+P, Ctrl+U, F12
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) ||
        e.key === 'F12' ||
        (e.key === 'PrintScreen')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Add event listeners
    image.addEventListener('contextmenu', preventContextMenu);
    image.addEventListener('dragstart', preventDragStart);
    image.addEventListener('dragover', preventDragOver);
    image.addEventListener('mousedown', preventSelect);
    image.addEventListener('keydown', preventKeyboard);

    // Also protect the parent container
    const parent = image.parentElement;
    if (parent) {
      parent.addEventListener('contextmenu', preventContextMenu);
      parent.addEventListener('dragstart', preventDragStart);
      parent.addEventListener('dragover', preventDragOver);
    }

    // Cleanup
    return () => {
      image.removeEventListener('contextmenu', preventContextMenu);
      image.removeEventListener('dragstart', preventDragStart);
      image.removeEventListener('dragover', preventDragOver);
      image.removeEventListener('mousedown', preventSelect);
      image.removeEventListener('keydown', preventKeyboard);
      
      if (parent) {
        parent.removeEventListener('contextmenu', preventContextMenu);
        parent.removeEventListener('dragstart', preventDragStart);
        parent.removeEventListener('dragover', preventDragOver);
      }
    };
  }, []);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={className}
      draggable={false}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
      onMouseDown={(e) => {
        // Prevent text selection on image
        if (e.detail > 1) {
          e.preventDefault();
          return false;
        }
      }}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        KhtmlUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      {...props}
    />
  );
}
