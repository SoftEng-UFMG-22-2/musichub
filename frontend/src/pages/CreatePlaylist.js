
import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './TopArtists.css'
import './CreatePlaylist.css'


class CustomSelect {
  constructor(originalSelect) {
    console.log("Hi");
    this.originalSelect = originalSelect;
    this.customSelect = document.createElement("div");
    this.customSelect.classList.add("select");

    this.originalSelect.querySelectorAll("option").forEach((optionElement) => {
      const itemElement = document.createElement("div");

      itemElement.classList.add("box");
      itemElement.textContent = optionElement.textContent;
      this.customSelect.appendChild(itemElement);

      if (optionElement.selected) {
        this._select(itemElement);
      }

      itemElement.addEventListener("click", () => {
        if (
          this.originalSelect.multiple &&
          itemElement.classList.contains("select__item--selected")
        ) {
          this._deselect(itemElement);
        } else {
          this._select(itemElement);
        }
      });
    });

    this.originalSelect.insertAdjacentElement("afterend", this.customSelect);
    this.originalSelect.style.display = "none";
  }

  _select(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    if (!this.originalSelect.multiple) {
      this.customSelect.querySelectorAll(".select__item").forEach((el) => {
        el.classList.remove("select__item--selected");
      });
    }

    this.originalSelect.querySelectorAll("option")[index].selected = true;
    itemElement.classList.add("select__item--selected");
  }

  _deselect(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    this.originalSelect.querySelectorAll("option")[index].selected = false;
    itemElement.classList.remove("select__item--selected");
  }
}

document.querySelectorAll(".custom-select").forEach((selectElement) => {
  new CustomSelect(selectElement);
});


function CreatePlaylist() {
  const [{ top_artists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  return (
    <div className="body">
          <h2>Selecione artistas para compor uma nova playlist: </h2>
        <div className="top-artists-container">
          <select name="artist" class="custom-select" multiple>
          {
            top_artists? (Object.entries(top_artists)?.map(([artist, url]) => (
              <option value={artist}>
                <h3>{artist}</h3>
               </option>
            ))) :
            Array.from({ length:10 },
              (_, i) => (
              <option value="Loading...">
                <h3>Loading...</h3>
               </option>
            )
            )

          }
          </select>
        </div>
    </div>
  )
}

export default CreatePlaylist

