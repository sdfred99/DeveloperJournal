const topic = "seth-dev-journal-uh8i0ppq";
const journalUrl = "http://100.84.89.106.3006";

async function sendReminder() {
    try {
        const response = await fetch(`https://ntfy.sh/${topic}`, {
            method: "POST",
            headers: {
                "Title": "Developer Journal",
                "Priority": "default",
                "Actions": `view, Open Journal, ${journalUrl}`
            },
            body: "What did you work on today?"
        });

        if (!response.ok) {
            throw new Error(`ntfy error: ${response.status}`);
        }

        console.log("Reminder sent!");
    } catch (err) {
        console.error(err);
    }
}

sendReminder();