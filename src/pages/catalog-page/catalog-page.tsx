import { useAppSelector } from '../../hooks';
import { getFilteredCameras, getIsFilteredCamerasLoading } from '../../store/filters-sorting-reducer/selectors';
import { getIsActiveAddItemModal, getIsActiveSuccessAddItemModal } from '../../store/modal-reducer/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Pagination from '../../components/pagination/pagination';
import CardList from '../../components/card-list/card-list';
import Sortings from '../../components/sortings/sortings';
import Filters from '../../components/filters/filters';
import Preloader from '../../components/preloader/preloader';
import { PageName } from '../../const';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import SuccessAddItemModal from '../../components/success-add-item-modal/success-add-item-modal';

export default function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getFilteredCameras);
  const isFilteredCamerasLoading = useAppSelector(getIsFilteredCamerasLoading);
  const isActiveAddItem = useAppSelector(getIsActiveAddItemModal);
  const isActiveSuccessAddItem = useAppSelector(getIsActiveSuccessAddItemModal);

  return (
    <>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs pageName={PageName.CatalogPage} />
          <section className="catalog" data-testid="catalog-page">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <Filters />
                </div>
                <div className="catalog__content">
                  <Sortings />
                  {(isFilteredCamerasLoading) ? <Preloader /> : <CardList />}
                  {(cameras.length === 0) && <div>По вашему запросу ничего не найдено</div>}
                  {(cameras.length > 0) && <Pagination />}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      {isActiveAddItem && <AddItemModal />}
      {isActiveSuccessAddItem && <SuccessAddItemModal />}
    </>
  );
}
