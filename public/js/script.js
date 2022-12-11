
function onSubmit(e) {
    e.preventDefault()
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = ''
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please add some text')
        return;
    }

    imageRequest(prompt, size);

}

const imageRequest = async (prompt, size) => {
    try {
        show();

        const res = await fetch('/openai/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idea: prompt,
                size
            })
        })

        if (!res.ok) {
            hide();
            throw new Error("Image could not be generated");
        }
        const data = await res.json();

        //console.log(data)

        const url = data.data;

        document.querySelector('#image').src = url;


        hide()

    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

function show() {
    document.querySelector('.spinner').classList.add('show');
}
function hide() {
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector("#image-form").addEventListener('submit', onSubmit)