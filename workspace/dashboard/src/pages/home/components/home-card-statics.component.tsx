import { CardBody, CardContainer, SalesCount, SalesText } from '../style/home.style';

const HomeCardStatistic = ({ info, icon, text }:any) => {
  return (
    <div className="col-md-3">
      <div className="card border-card">
        <CardBody>
          <CardContainer>
            <p className="text-center mt-1" style={{ fontSize: '25px' }}>
              {icon}
            </p>
          </CardContainer>
          <div className='mt-3'>
            <SalesCount>{info}</SalesCount>
            <SalesText>{text}</SalesText>
          </div>
        </CardBody>
      </div>
    </div>
  );
};

export default HomeCardStatistic;
