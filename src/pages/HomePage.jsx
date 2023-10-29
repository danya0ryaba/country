import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountries } from '../store/countries/countries-actions'
import { selectVisibleCountries, selectCountriesInfo } from '../store/countries/countries-selectors'
import { selectAllControls } from '../store/controls/controls-selectors'

export const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { search, region } = useSelector(selectAllControls)

  const countries = useSelector(state => selectVisibleCountries(state, { search, region }));

  const { status, error, qty } = useSelector(selectCountriesInfo)
  useEffect(() => {
    if (!qty) dispatch(loadCountries())
  }, [qty, dispatch])

  return (
    <div>
      <Controls />
      {error && <h2>Cant fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2 >}

      {status === 'received' && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: 'Population',
                  description: c.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: c.region,
                },
                {
                  title: 'Capital',
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}

    </div>
  );
};
