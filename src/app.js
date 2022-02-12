import html2canvas from 'html2canvas';
import './style.scss';


html2canvas(document.querySelector('#capture')).then(function(canvas) {
    // document.body.appendChild(canvas);

    console.log(canvas);
    let width = canvas.width;
    let height = canvas.height;
    let ctx = canvas.getContext('2d');

    let idata = ctx.getImageData(0, 0, width, height);
    let datum = [];

    for (let i=0; i < 36; i++) {
        datum.push(ctx.createImageData(width, height))
    }

    for (let f = 0; f < width; f++) {
        for (let k = 0; k < height; k++) {

            for (let l = 0; l < 2; l++) {
                let n = 4 *  ( k * width + f);
                let m = Math.floor(36 * (Math.random()  + 2*f/width)/3 );
                for (let p = 0; p < 4; p++) {
                    datum[m].data[n+p] = idata.data[n+p];
                }
            }
        }
    }

    datum.forEach((imagedata, i) => {
        let cloned = canvas.cloneNode();

        cloned.getContext('2d').putImageData(imagedata, 0, 0);
        document.querySelector('.container').appendChild(cloned);

        cloned.style.transition = "all 1s ease-out " + 0.8*i/36 + "s";
        setTimeout( () => {
            let angle = (Math.random() - 0.5) * 2 * Math.PI;
            cloned.style.transform = "rotate("+ 12*(Math.random() - 0.5) +"deg)  translate("+ 60*Math.cos(angle) +"px, "+ 60*Math.sin(angle) +"px ";

            cloned.style.opacity = 0;
        })
    })

});

console.log('hi!')
