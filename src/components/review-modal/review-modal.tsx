import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setIsActiveReviewModal } from '../../store/modal-reducer/modal-reducer';
import { sendProductReviewAction } from '../../store/api-action';
import ModalOverlay from '../modal-overlay/modal-overlay';
import FocusTrap from 'focus-trap-react';

export default function ReviewModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();

  const [isEmpty, setIsEmpty] = useState(true);
  const [formData, setFormData] = useState({
    cameraId: Number(id),
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: Number(),
  });

  const handleCloseModalClick = () => {
    document.body.classList.remove('scroll-lock');
    dispatch(setIsActiveReviewModal(false));
  };

  const handleGetRatingClick = (evt: SyntheticEvent) => {
    if((evt.target as HTMLInputElement).value) {
      setFormData({...formData, rating: Number((evt.target as HTMLInputElement).value)});
    }
  };

  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => setFormData({...formData, userName: evt.currentTarget.value});
  const handleAdvantagesChange = (evt: SyntheticEvent<HTMLInputElement>) => setFormData({...formData, advantage: evt.currentTarget.value});
  const handleDisadvantagesChange = (evt: SyntheticEvent<HTMLInputElement>) => setFormData({...formData, disadvantage: evt.currentTarget.value});
  const handleReviewChange = (evt: SyntheticEvent<HTMLTextAreaElement>) =>setFormData({...formData, review: evt.currentTarget.value});


  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (Object.values(formData).every((item) => !!item)) {
      dispatch(sendProductReviewAction(formData));
    }
    handleCloseModalClick();
    evt.currentTarget.reset();
  };

  const handleButtonSubmit = () => setIsEmpty(false);

  return (
    <FocusTrap focusTrapOptions={{
      fallbackFocus: '#stars-rate'
    }}
    >
      <div className="modal is-active">
        <div className="modal__wrapper">
          <ModalOverlay />
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form onSubmit={handleFormSubmit} method="post">
                <div className="form-review__rate">
                  <fieldset className={formData.rating || isEmpty ? 'rate form-review__item' : 'rate form-review__item is-invalid'}>
                    <legend className="rate__caption">Рейтинг
                      <img src="/img/sprite/icon-snowflake.svg" alt="icon snowflake" width="9" height="9" aria-hidden="true"/>
                    </legend>
                    <div className="rate__bar" id="stars-rate" tabIndex={0}>
                      <div onClick={handleGetRatingClick} className="rate__group">
                        <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" required tabIndex={-1}/>
                        <label className="rate__label" htmlFor="star-5" title="Отлично" />
                        <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" tabIndex={-1}/>
                        <label className="rate__label" htmlFor="star-4" title="Хорошо"/>
                        <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" tabIndex={-1}/>
                        <label className="rate__label" htmlFor="star-3" title="Нормально"/>
                        <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" tabIndex={-1}/>
                        <label className="rate__label" htmlFor="star-2" title="Плохо"/>
                        <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" tabIndex={-1}/>
                        <label className="rate__label" htmlFor="star-1" title="Ужасно"/>
                      </div>
                      <div className="rate__progress">
                        <span className="rate__stars">{formData.rating.toString()}</span>
                        <span>/</span>
                        <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p className="rate__message">Нужно оценить товар</p>
                  </fieldset>
                  <div className={formData.userName || isEmpty ? 'custom-input form-review__item' : 'custom-input form-review__item is-invalid'}>
                    <label>
                      <span className="custom-input__label">Ваше имя
                        <img src="/img/sprite/icon-snowflake.svg" alt="icon snowflake" width="9" height="9" aria-hidden="true"/>
                      </span>
                      <input onChange={handleNameChange} type="text" name="user-name" placeholder="Введите ваше имя" required/>
                    </label>
                    <p className="custom-input__error">Нужно указать имя</p>
                  </div>
                  <div className={formData.advantage || isEmpty ? 'custom-input form-review__item' : 'custom-input form-review__item is-invalid'}>
                    <label>
                      <span className="custom-input__label">Достоинства
                        <img src="/img/sprite/icon-snowflake.svg" alt="icon snowflake" width="9" height="9" aria-hidden="true"/>
                      </span>
                      <input onChange={handleAdvantagesChange} type="text" name="user-plus" placeholder="Основные преимущества товара" required/>
                    </label>
                    <p className="custom-input__error">Нужно указать достоинства</p>
                  </div>
                  <div className={formData.disadvantage || isEmpty ? 'custom-input form-review__item' : 'custom-input form-review__item is-invalid'}>
                    <label>
                      <span className="custom-input__label">Недостатки
                        <img src="/img/sprite/icon-snowflake.svg" alt="icon snowflake" width="9" height="9" aria-hidden="true"/>
                      </span>
                      <input onChange={handleDisadvantagesChange} type="text" name="user-minus" placeholder="Главные недостатки товара" required/>
                    </label>
                    <p className="custom-input__error">Нужно указать недостатки</p>
                  </div>
                  <div className={formData.review || isEmpty ? 'custom-textarea form-review__item' : 'custom-textarea form-review__item is-invalid'}>
                    <label>
                      <span className="custom-textarea__label">Комментарий
                        <img src="/img/sprite/icon-snowflake.svg" alt="icon snowflake" width="9" height="9" aria-hidden="true"/>
                      </span>
                      <textarea onChange={handleReviewChange} name="user-comment" minLength={5} placeholder="Поделитесь своим опытом покупки" required />
                    </label>
                    <div className="custom-textarea__error">Нужно добавить комментарий</div>
                  </div>
                </div>
                <button onClick={handleButtonSubmit} className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
              </form>
            </div>
            <button onClick={handleCloseModalClick} className="cross-btn" type="button" aria-label="Закрыть попап">
              <img src="/img/sprite/icon-close.svg" alt="icon snowflake" width="10" height="10" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}
