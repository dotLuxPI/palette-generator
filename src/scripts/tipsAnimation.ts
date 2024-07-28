// event listener that fades out the tips after 5 seconds
document.addEventListener("DOMContentLoaded", async () => {
    if (typeof window == "undefined") {
        return;
    }
    
    while (!document.getElementById("shortcut-wrapper")?.children[0]) {
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const tips: HTMLElement|null = document.getElementById("shortcut-wrapper");

    await new Promise((resolve) => setTimeout(resolve, 5000)).then(() => {
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