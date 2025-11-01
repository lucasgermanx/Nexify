import styled from "styled-components";
import { Card } from "react-bootstrap";

export const CardContainer = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%);
  color: white;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.4);
  flex-shrink: 0;
`;

export const CardBody = styled.div`
  padding: 16px;
  background-color: #121212;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
    border-color: rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

export const SalesCount = styled.strong`
  font-size: 24px;
  padding: 0px;
  margin: 0px;
  color: white;
  font-weight: 700;
  line-height: 1.2;
  display: block;
`;

export const SalesText = styled.p`
  font-size: 12px;
  padding: 0px;
  margin: 4px 0 0 0;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const WelcomeSection = styled.section`
  margin-top: 2rem;
  
  h2 {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    
    .orange-text {
      color: #ff8c00;
      background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  p {
    color: #94a3b8;
    font-size: 1rem;
    margin: 0;
  }
`;

export const ChartSection = styled.section`
  margin-top: 1rem;
`;

export const WelcomeCard = styled.div`
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  
  .welcome-date {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.75rem;
    margin-bottom: 4px;
  }
  
  .welcome-title {
    color: white;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 4px;
    
    .orange-text {
      background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  .welcome-subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    margin: 0;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const RecentActivityCard = styled(Card)`
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-top: 1rem;
  
  .card-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 12px 16px;
    background-color: transparent;
    
    h5 {
      color: white;
      font-weight: 600;
      margin: 0;
      font-size: 0.875rem;
    }
    
    p {
      color: #94a3b8;
      font-size: 0.75rem;
      margin: 2px 0 0 0;
    }
  }
  
  .empty-state {
    padding: 24px 16px;
    text-align: center;
    
    .empty-icon {
      font-size: 32px;
      color: rgba(255, 255, 255, 0.2);
      margin-bottom: 8px;
    }
    
    .empty-text {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
    }
  }
`;