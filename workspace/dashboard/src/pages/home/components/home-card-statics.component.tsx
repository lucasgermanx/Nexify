import { CardBody, CardContainer, SalesCount, SalesText } from '../style/home.style';

const HomeCardStatistic = ({ info, icon, text, period }:any) => {
    return (
        <CardBody style={{ height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '150px' }}>
        <CardContainer>
          <span style={{ fontSize: '20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </span>
        </CardContainer>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginTop: 'auto' }}>
          <SalesCount>{info || 0}</SalesCount>
          <SalesText>{text}</SalesText>
          {period && (
            <p style={{ 
              fontSize: '10px', 
              color: '#64748b', 
              margin: '4px 0 0 0',
              fontWeight: '400'
            }}>
              {period}
            </p>
          )}
        </div>
      </div>
    </CardBody>
  );
};

export default HomeCardStatistic;
