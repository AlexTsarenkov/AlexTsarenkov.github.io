class UserInfo {
    constructor() {
        this.name = document.querySelector('.user-info__name').textContent;
        this.bio = document.querySelector('.user-info__job').textContent;
        this.photo = document.querySelector('.user-info__photo').style.backgroundImage;
    }

    setUserInfo(name, bio) {
        this.name = name;
        this.bio = bio;
        this.updateUserInfo();
    }

    setUserPhoto(photoUrl) {
        this.photo = `url(${photoUrl})`;
        this.updateUserInfo();
    }
    updateUserInfo() {
        document.querySelector('.user-info__name').textContent = this.name;
        document.querySelector('.user-info__job').textContent = this.bio;
        document.querySelector('.user-info__photo').style.backgroundImage = this.photo;
    }
}