const fileInputFollowers = document.getElementById("FileFollowers");
const fileInputFollowing = document.getElementById("FileFollowing");
const buttonSubmit = document.getElementById("submit");
let resultText = document.getElementById("result");
let DataFollowers = [];
let DataFollowing = [];
let DataNotFollow = [];

fileInputFollowers.addEventListener("change", () => {
  const file = fileInputFollowers.files[0];
  const reader = new FileReader();
  let JsonDataFollowers;

  if (!file) {
    return;
  }

  reader.onload = function (event) {
    try {
      JsonDataFollowers = JSON.parse(event.target.result);
      DataFollowers = JsonDataFollowers.map((e) => {
        return e.string_list_data[0].value;
      });
    } catch (err) {
      console.error("File bukan JSON valid:", err);
    }
  };
  reader.readAsText(file);
});

fileInputFollowing.addEventListener("change", () => {
  const file = fileInputFollowing.files[0];
  const reader = new FileReader();
  if (!file) {
    return;
  }

  reader.onload = function (event) {
    try {
      const JsonDataFollowing = JSON.parse(event.target.result);
      const ArrayJsonDataFollowing = JsonDataFollowing.relationships_following;
      DataFollowing = ArrayJsonDataFollowing.map((e) => {
        return e.string_list_data[0].value;
      });

      DataFollowing.map((eFollowing) => {
        let followCheck;
        DataFollowers.map((eFollowers) => {
          if (eFollowers == eFollowing) {
            followCheck = true;
            return;
          }
        });

        if (!followCheck) {
          DataNotFollow.push(eFollowing);
        }
      });
      DataNotFollow.map((e) => {
        const paragraph = document.createElement("p");
        resultText.appendChild(paragraph);
        paragraph.innerText = e;
      });
    } catch (err) {
      console.error("File bukan JSON valid:", err);
    }
  };
  reader.readAsText(file);
});
