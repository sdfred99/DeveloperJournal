const express = require("express");
const fs = require("fs");
const simpleGit = require("simple-git");

const app = express();
const git = simpleGit();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
        <h1>Seth Dev Journal</h1>

        <form method="POST">
            <h3>Today I worked on</h3>
            <textarea name="worked" rows="5"></textarea>

            <h3>Learned</h3>
            <textarea name="learned" rows="5"></textarea>

            <h3>Personal Project Progress</h3>
            <textarea name="progress" rows="5"></textarea>

            <br>
            <button>Save</button>
        </form>

    `);
});

app.post("/", async (req, res) => {

    const today = new Date()
        .toISOString()
        .split("T")[0];

    const entry = `
# ${today}

## Worked On

${req.body.worked}

## Learned

${req.body.learned}
`;

    fs.writeFileSync(
        `journal/${today}.md`,
        entry
    );

    await git.add(".");
    await git.commit(`Journal ${today}`);
    await git.push();

    res.send("Saved!");
});


app.listen(3006, "0.0.0.0", () => {
    console.log("Journal running on port 3006");
});