import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Provider from '@/context/Provider';
import Header from '@/componentes/Header';
import { LoadingProvider } from '@/context/LoadingProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body>
          <LoadingProvider>
            <div className="box">
              <Header></Header>
              <div className="container-fluid mt-4 flex-grow-1">
                <div className="row">
                  <div className="col-10 offset-1">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </LoadingProvider>
        </body>
      </Provider>
    </html>
  );
}
