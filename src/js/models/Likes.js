export default class Likes {
  constructor(){
    this.likes = [];
  }

  addLike(id, title, author, img){
    const like = {
      id,
      title,
      author,
      img
    }
    this.likes.push(like);
  }

  isLiked(id){
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes(){
    return this.likes.length;
  }
}