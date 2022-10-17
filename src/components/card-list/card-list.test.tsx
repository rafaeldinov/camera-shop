import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, ITEMS_PER_PAGE_COUNT } from '../../const';
import CardList from './card-list';
import { CAMERAS_COUNT, makeFakeCameras } from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const fakeCameras = makeFakeCameras(CAMERAS_COUNT);
const fakePageCameras = makeFakeCameras(ITEMS_PER_PAGE_COUNT);

const store = mockStore({
  camera: {
    cameras: fakeCameras,
    pageCameras: fakePageCameras,
  }
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../store/camera-reducer/camera-reducer');

describe('Component: CardList', () => {
  it('should render correctly', async() => {
    const pageNumber = 1;

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardList pageNumber={pageNumber} />
        </HistoryRouter>,
      </Provider>,
    );
    expect(screen.getAllByTestId('div-id').length).toBe(ITEMS_PER_PAGE_COUNT);
  });
});