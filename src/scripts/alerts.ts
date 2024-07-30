import sleep from "./sleep";

// Lock to prevent multiple alerts at the same time
let lock = false;

/**
 * @param msg the body of the message
 * @returns a promise that resolves after the alert is removed
 */
export async function error(msg: string): Promise<void> {

    if (lock) {
        return;
    }

    lock = true;

    const alert = document.createElement('div');
    alert.className = 'alert alert-error';

    const title = document.createElement('h2');
    title.className = 'alert-title';
    title.innerHTML = 'Ops... Something went wrong!';
    alert.prepend(title);


    const text = document.createElement('p');
    text.className = 'alert-text';
    text.innerHTML = msg;
    alert.appendChild(text);

    const progressBar = document.createElement('div');
    progressBar.className = 'alert-progress-bar';
    alert.appendChild(progressBar);

    document.body.appendChild(alert);

    // Blur everything except the alert
    const contentElement = document.getElementById('content');
    if (contentElement) {
        contentElement.style.filter = 'blur(5px)';
    }

    await sleep(3000);

    // Remove alert
    alert.remove();

    // Remove blur
    if (contentElement) {
        contentElement.style.filter = 'none';
    }

    lock = false;
}