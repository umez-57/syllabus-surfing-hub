import React, { useState } from "react";

interface FolderProps {
  color?: string;
  size?: number;
  item?: React.ReactNode;
  className?: string;
}

/** Darken or lighten a hex color by a given percentage. */
const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder: React.FC<FolderProps> = ({
  // Default folder color
  color = "#CCCCCC",
  size = 1,
  item = null,
  className = "",
}) => {
  const [open, setOpen] = useState(false);

  // Paper color inside folder
  const paperColor = darkenColor("#fff", 0.8);

  // Slightly darken the folder color for the "back" portion
  const folderBackColor = darkenColor(color, 0.08);

  // We'll apply partial opacity to the front flaps
  const flapOpacity = 0.5; // tweak as desired

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const folderStyle: React.CSSProperties = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
  } as React.CSSProperties;

  // Scale wrapper
  const scaleStyle = { transform: `scale(${size})` };

  // Raise the paper ~80% if open, else keep it at bottom
  const paperTransform = open
    ? "translate(-50%, -80%)"
    : "translate(-50%, 0%)";

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${
          !open ? "hover:-translate-y-2" : ""
        }`}
        style={{
          ...folderStyle,
          transform: open ? "translateY(-8px)" : undefined,
        }}
        onClick={handleClick}
      >
        {/* Folder "back" */}
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px]"
            style={{ backgroundColor: folderBackColor }}
          />

          {/* Single paper inside */}
          <div
            className="absolute z-20 bottom-[10%] left-1/2 w-[80%] h-[70%] transition-all duration-300 ease-in-out"
            style={{
              transform: paperTransform,
              backgroundColor: paperColor,
              borderRadius: "10px",
            }}
          >
            {item}
          </div>

          {/* Folder "front" flaps with partial opacity */}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              opacity: flapOpacity,
              borderRadius: "5px 10px 10px 10px",
              ...(open && { transform: "skew(15deg) scaleY(0.6)" }),
            }}
          />
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? "group-hover:[transform:skew(-15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              opacity: flapOpacity,
              borderRadius: "5px 10px 10px 10px",
              ...(open && { transform: "skew(-15deg) scaleY(0.6)" }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Folder;
