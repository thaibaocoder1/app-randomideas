import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._ideaList = new IdeaList();
  }
  addEventListener() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  async handleSubmit(e) {
    e.preventDefault();
    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert("Please enter all fields");
      return;
    }
    localStorage.setItem("user", this._form.elements.username.value);
    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };
    const newIdea = await IdeasApi.createIdea(idea);
    this._ideaList.addIdeaToList(newIdea.data.data);
    if (!Object.values(idea).includes("")) {
      this._form.reset();
      document.dispatchEvent(new Event("closemodal"));
    }
    this.render();
  }
  render() {
    this._formModal.innerHTML = `<form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input type="text" value="${
        localStorage.getItem("user") ? localStorage.getItem("user") : ""
      }" name="username" id="username" />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <input type="text" name="tag" id="tag" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>`;
    this._form = document.querySelector("#idea-form");
    this.addEventListener();
  }
}

export default IdeaForm;
