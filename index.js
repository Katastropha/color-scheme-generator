const colors = document.querySelector(".colors");
const seedColor = document.querySelector(".seed-color");
const colorScheme = document.querySelector(".color-scheme");
const btnGetColorScheme = document.querySelector(".btn-get-color-scheme");

const getColorSchemeLink = () => {
  const color = seedColor.value.replace("#", "");
  const scheme = colorScheme.value;

  return `https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=5`;
};

const getObjectColors = (data) => {
  return {
    seed: data.seed.hex.value,
    first: data.colors[0].hex.value,
    second: data.colors[1].hex.value,
    third: data.colors[2].hex.value,
    fourth: data.colors[3].hex.value,
  };
};

btnGetColorScheme.addEventListener("click", (e) => {
  const link = getColorSchemeLink();
  fetch(link)
    .then((result) => result.json())
    .then((data) => {
      const obj = getObjectColors(data);
      const feedHtml = `
                <div class="color" style="background:${obj.seed};">
                    <button class="hex">${obj.seed}</button>
                </div>
                <div class="color" style="background:${obj.first};">
                    <button class="hex">${obj.first}</button>
                </div> 
                <div class="color" style="background:${obj.second};">
                    <button class="hex">${obj.second}</button>
                </div>
                <div class="color" style="background:${obj.third};">
                    <button class="hex">${obj.third}</button>
                </div>
                <div class="color" style="background:${obj.fourth}">
                    <button class="hex">${obj.fourth}</button>
                </div>`;

      colors.innerHTML = feedHtml;
    });
});

document.addEventListener("click", (e) => {
  const hexNumber = e.target.closest(".hex");
  !hexNumber || navigator.clipboard.writeText(e.target.innerText);
});
