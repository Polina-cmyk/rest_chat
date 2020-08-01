btn.onclick = () => {
    fetch("message", {
        headers: {
            Acept: "application/json",
            "Content-type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({nick: nick.value, message: message.value}),
        mhistory: innerHTML = `${nick.value} ${message.value} <br>`,
    });
    nick.value = ''
    message.value = ''
    
};

// dlt.onclick = () => {
//     fetch("message/:messageId", {
//         method: "DELETE",

//     })
// }

file.onchange = async () => {
    url.innerHTML = url.href = "/" + await (await fetch("/file", {
        method: "POST",
        body: file.files[0],
    })
    ).text();
};