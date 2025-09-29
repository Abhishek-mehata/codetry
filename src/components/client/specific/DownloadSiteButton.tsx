import { Link } from "react-router-dom";

function detectOS(): "windows" | "mac" | "linux" | "other" {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("windows")) return "windows";
    if (ua.includes("mac os x") || ua.includes("macintosh")) return "mac";
    if (ua.includes("linux")) return "linux";
    return "other";
}

function downloadBlob(blob: Blob, suggestedName: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = suggestedName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

/** Windows .url InternetShortcut (supports IconFile as an HTTPS URL). */
function makeWindowsUrlShortcut(url: string, iconUrl: string): Blob {
    // CRLF line endings are important on Windows
    const contents =
        `[InternetShortcut]\r\n` +
        `URL=${url}\r\n` +
        `IconFile=${iconUrl}\r\n` +
        `IconIndex=0\r\n`;
    return new Blob([contents], { type: "application/octet-stream" });
}

/** macOS .webloc (XML plist). Icon can’t be set remotely. */
function makeMacWebloc(url: string): Blob {
    const contents =
        `<?xml version="1.0" encoding="UTF-8"?>` +
        `<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" ` +
        `"http://www.apple.com/DTDs/PropertyList-1.0.dtd">` +
        `<plist version="1.0"><dict>` +
        `<key>URL</key><string>${url}</string>` +
        `</dict></plist>`;
    return new Blob([contents], { type: "application/octet-stream" });
}

/** Linux .desktop (launcher). Most desktops expect Icon= to be a local path or theme name. */
function makeLinuxDesktop(url: string, name: string): Blob {
    const contents =
        `[Desktop Entry]\n` +
        `Version=1.0\n` +
        `Type=Link\n` +               // Link type opens in browser
        `Name=${name}\n` +
        `URL=${url}\n` +
        `Terminal=false\n` +
        `Icon=web-browser\n`;         // Use a generic theme icon
    return new Blob([contents], { type: "application/x-desktop" });
}

interface DownloadSiteButtonProps {
    btnType?: string;
}


   const  DownloadSiteButton: React.FC<DownloadSiteButtonProps> = ({ btnType }) => {
    const handleClick = () => {
        if (window.innerWidth < 768) {
            alert("To add this website to your home screen:\n1. Open the browser menu.\n2. Select 'Add to Home Screen'");
            return;
        }
        const url = window.location.origin; // or a specific route you want
        const name = "DmtTourism";
        // Prefer .ico for Windows InternetShortcut icons
        const iconUrl = new URL("/favicon/favicon.ico", window.location.origin).toString();
        const os = detectOS();

        if (os === "windows") {
            const blob = makeWindowsUrlShortcut(url, iconUrl);
            downloadBlob(blob, `${name}.url`);
        } else if (os === "mac") {
            const blob = makeMacWebloc(url);
            downloadBlob(blob, `${name}.webloc`);
        } else if (os === "linux") {
            const blob = makeLinuxDesktop(url, name);
            downloadBlob(blob, `${name}.desktop`);
        } else {
            // Fallback: offer all three formats in a zip? For simplicity, give .url (works on Windows).
            const blob = makeWindowsUrlShortcut(url, iconUrl);
            downloadBlob(blob, `${name}.url`);
        }
    };

    if (btnType !== "link") {
        return (
            <button
                onClick={handleClick}
                className="rounded text-white py-[10px] px-[20px] bg-[#9c58df] flex items-center justify-center text-sm font-medium w-[230px]"
            >
                Install DMT
            </button>
        );
    } else {
        return (<li>
            <Link className="text-sm font-medium" to="/dmt-installation-guide">
                Install DMT
            </Link>
        </li>)
    }

}


export default DownloadSiteButton;


