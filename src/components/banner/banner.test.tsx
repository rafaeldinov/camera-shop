import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import Banner from './banner';
import { Routes, Route } from 'react-router-dom';
import { makeFakePromo } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  promoOffer: makeFakePromo(),
});


describe('Component: Banner', () => {
  it('should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Banner />}
            />
          </Routes>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByRole('button', { name: /Подробнее/i })).toBeInTheDocument();
  });
});
