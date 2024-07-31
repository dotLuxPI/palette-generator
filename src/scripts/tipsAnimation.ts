import sleep from "./sleep";

// event listener that fades out the tips after 5 seconds
document.addEventListener("DOMContentLoaded", async () => {
    // check if the script is running in a browser
    if (typeof window == "undefined") {
        return;
    }
    
    // wait for the tips to load
    while (!document.getElementById("shortcut-wrapper")?.children[0]) {
        await sleep(100);
    }

    // get the tips element
    const tips: HTMLElement|null = document.getElementById("shortcut-wrapper");

    // gradually fades out the tips after 5 seconds
    await sleep(5000).then(() => {
        if (tips != null) {
            const intervalId = setInterval(() => {
                const opacity = parseFloat(tips?.style.opacity || "1");
                tips.style.opacity = (opacity - 0.05).toString();
    
                if (parseFloat(tips?.style.opacity || "1") <= 0.05) {
                    tips.style.opacity = "0";
                    clearInterval(intervalId);
                }
            }, 50);
        }
    });
});