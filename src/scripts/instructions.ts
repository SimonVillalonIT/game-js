import { KEYS_URLS } from "./constants";

KEYS_URLS.forEach(({ img, p }) => {
  const keycapDiv = document.createElement("div");
  keycapDiv.className = "flex flex-col items-center justify-between";

  const imgElement = document.createElement("img");
  imgElement.className = "w-24";
  imgElement.src = img;
  imgElement.alt = "Esc Key";

  const pElement = document.createElement("p");
  pElement.className = "font-bold text-xl";
  pElement.textContent = p;

  keycapDiv.appendChild(imgElement);
  keycapDiv.appendChild(pElement);

  const parentElement = document.getElementById("instructions");
  parentElement?.appendChild(keycapDiv);
});
