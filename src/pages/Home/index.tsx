import MainLayout from '@/components/MainLayout';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import Header from './Header';

function Home() {
  return (
    <MainLayout>
      <Header />
      <CurrentWeather />
      <Forecast />
    </MainLayout>
  );
}

export default Home;
