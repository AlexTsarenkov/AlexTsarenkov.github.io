class Api {
    constructor(serverUrl, token) {
        this.serverUrl = serverUrl;
        this.token = token;
    }

    fetchInitialCards(callbackCardAdd) {
        fetch(`${this.serverUrl}cards`, {
            headers: {
                authorization: this.token
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                console.log(result);
                for (let iterator of result) {
                    callbackCardAdd(iterator.name, iterator.link, iterator.likes.length, iterator._id)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addCardToServer(name, link, callbackCardAdd, finallyCallback) {
        fetch(`${this.serverUrl}cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                callbackCardAdd(result.name, result.link, result.likes.length, result._id);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => finallyCallback());
    }

    sendUserInfoToServer(name, bio, setUserNameCallback, finallyCallback) {
        fetch(`${this.serverUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: bio
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                setUserNameCallback(result.name, result.about);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => finallyCallback());
    }

    getUserInfoFromServer(UserInfo) {
        fetch(`${this.serverUrl}users/me`, {
            headers: {
                authorization: this.token
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                console.log(result);
                UserInfo.setUserInfo(result.name, result.about);
                UserInfo.setUserPhoto(result.avatar);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}