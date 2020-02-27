/* REVIEW Отлично, что код обёрнут в IIFE функцию */
(function main() {
  const serverUrl = 'http://95.216.175.5/cohort7/';
  const token = '1f9379f0-3ad1-4693-b8a4-6b89792875ba';

  const words = {
    ru: {
      invalidLength: 'Должно быть от 2 до 30 символов',
      invalidTypeLink: 'Здесь должна быть ссылка',
      fieldObligatory: 'Это поле обязательно для заполнения',
      fieldOk: ''
    }
  }

  const api = new Api(serverUrl, token);
  const cardElement = document.querySelector('.places-list');
  const rootContainer = document.querySelector('.root');
  const validator = new FormValidator(words);
  const addCardPopUp = new AddCardPopUp(rootContainer, validator);
  const profileEditPopUp = new ProfileEditPopUp(rootContainer, validator);
  const cardFullsizePopUp = new CardFullsizePopUp(rootContainer);
  const card = new Card(cardFullsizePopUp);
  const cardList = new CardList(cardElement, card);

  const profileManager = new UserInfo();

  api.getUserInfoFromServer(profileManager);

  document.querySelector('.user-info__button').addEventListener('click', addCardPopUp.show.bind(addCardPopUp));
  document.querySelector('.user-info__edit-button').addEventListener('click', profileEditPopUp.show.bind(profileEditPopUp));

  addCardPopUp.setSubmitDelegate( (title, link) => {
    addCardPopUp.setButtonStateLoading();
    api.addCardToServer(title, link, cardList.addCard.bind(cardList), addCardPopUp.setButtonStateNormal.bind(addCardPopUp));
  });



  profileEditPopUp.setSubmitDelegate( (name, bio) => {
    profileEditPopUp.setButtonStateLoading();

  /****************************************************************************************************************************************************************
REVIEW: Нужно исправить. Как я обнаружила, функция profileManager.setUserInfo обновляет данные о пользователе на странице до отправки их
на сервер после ввода пользователя. Но, так быть не должно, ведь запрос может и не выполниться,
может произойти сбой, тогда информация на странице должна остаться прежней, а не измениться на ту, что ввёл пользователь в форму. Т.е. данные на странице
должны обновиться только после успешной отсылки их на сервер методом PATCH. Поэтому самым рациональным будет, чтобы страница обновлялась не значениями
полей input формы профиля, а информацией, которую пришлёт серверная программа (в качестве ответа сервера) после вашей отсылки информации на сервер
функцией api.sendUserInfoToServer.
В пункте № 3 описания задания (3. Редактирование профиля) дана структура объекта, с только что сохраненными данными пользователя, который серверная программа
пришлет в ответе к вашему PATCH запросу. Этот объект ответа сервера нужно получить и вернуть в
той же функции api.sendUserInfoToServer, а затем в DOM - элементы, которые рендерят на страницу информацию о пользователе, ввести
свойства "name" и  "about" этого объекта. Для такого алгоритма работы с сервером код функции api.sendUserInfoToServer должен быть изменен.
Например, он может быть таким:

sendUserInfoToServer(UserInfo, finallyCallback) {
    return  fetch(`${this.serverUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: UserInfo.name,
                about: UserInfo.bio
            })
      })
      .then(res => {

          return res.json();    //обрабатываем ответ от сервера

      })
      .then(result => {

        return result;       // result - это и есть тот самый объект от сервера со свойствами name и about
      })
      .catch((err) => {
                console.log(err);
      })
      .finally(() => finallyCallback());
  }

  При таком коде функция sendUserInfoToServer будет возвращать промис с результатом result, который Вы уже можете обработать в методе then
  этого промиса в модуле script.js с помощью вашей функции profileManager.setUserInfo. Т.е. вместо нижеследующих двух Ваших инструкций
  должен быть примерно следующий код:
  api.sendUserInfoToServer(ваши аргументы).then(result => {
    profileManager.setUserInfo(result.name, result.about);
    //в этом месте вы должны предусмотреть закрытие формы профиля, так как она должна закрыться не раньше, чем придет
    ответ от сервера и вы его обработаете.
  });


**************************************************************************************************************************************************************/
    //profileManager.setUserInfo(name, bio);
    api.sendUserInfoToServer(name, bio, profileManager.setUserInfo.bind(profileManager), profileEditPopUp.setButtonStateNormal.bind(profileEditPopUp));
  });

  api.fetchInitialCards(cardList.addCard.bind(cardList));

})();

/* REVIEW. Резюме.
В задании проделана большая работа. Сделано дополнительное задание по добавлению карточки и сохранению информации о ней на сервер.
Сделан дополнительный пункт по изменению названия кнопки "Сохранить" на "Загрузка".

Что нужно исправить.
1. Нужно исправить алгоритм функции, отправляющей информацию о пользователе на сервер, и обновлять информацию о пользователе на странице
только после получения ответа от сервера.

Что нужно доделать.
1.Нужно выполнить, что написано в последнем пункте описания задания под названием "Общие комментарии".
 Там написано как предусмотреть обработку всех видов ошибок, которые могут быть при запросе и ответе сервера.

P.S. Пожалуйста, отладьте код, который я дала как примерный.


REVIEW. Резюме 2.

Вы исправили ошибку обработки данных, полученных от сервера и занесения информации на страницу, так же сделали возможным обнаружение большего
числа типов ошибок при работе с сервером. Это очень хорошо!
Но, можно лучше. Лучше, когда класс Api отвечает только за общение с сервером (выполнение принципа единственной ответственности класса),
т.е. отправляет данные серверу и получает их.
Обработку же полученных данных лучше осуществлять в других модулях, это облегчит расширение приложения, например, когда этот же ответ сервера
может понадобиться какому-нибудь вновь добавленному классу. Поэтому мой вариант, я думаю, правильней.

Задание принято!



*/



