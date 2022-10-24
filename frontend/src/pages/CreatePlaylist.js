
import React, { useState } from 'react';
import { useDataLayerValue } from '../DataLayer';
import './TopArtists.css'
import './CreatePlaylist.css'
import Artist from './components/Artist'

/*
class CustomSelect {
  constructor(originalSelect) {
    console.log("----Acess Constructor------");
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


function auxilia(){

}

function CreatePlaylist() {
  document.querySelectorAll(".custom-select").forEach((selectElement) => {
    new CustomSelect(selectElement);
  });
  const [{ top_artists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"
    console.log("CreatePlaylis function");
      return (
    <div className="body">
          <h2>Selecione artistas para compor uma nova playlist: </h2>
      <div className="top-artists-container">

          <select multiple={true} name="artist" className="custom-select">
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
*/

const toggleArtistSelected2 = (artist) => {
  console.log("Artist selected:", artist);
}

export default function CreatePlaylist() {
  const [{ top_artists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  const [state, setState] = useState(top_artists
                                            ?
                                              Object.assign({}, ...Object.entries(top_artists).map(([k, _]) => ({ [k]: false })))
                                            :
                                              {});

  

  const toggleArtistSelected = (artist) => {
    const nState = state;
    nState[artist] = !nState[artist];
    setState(nState);
    console.log(state);
  };

  return (
    <div className="body">
          <h2>Selecione artistas para compor uma nova playlist: </h2>
      <div className="top-artists-container">

        {
          top_artists ? (Object.entries(top_artists)?.map(([artist, url]) => (
            <div onClick={() => { toggleArtistSelected(artist); }}>
              <div className={state[artist]?"selected":"not-selected"}>
                <Artist name={artist} image={url} />
              </div>
            </div>
          ))) :
          Array.from(
            { length:10 },
            (_, i) => (
              <Artist name={"Loading..."} image={placeholder_link} />
            )
          )
        }



      </div>
    </div>

  )
}
