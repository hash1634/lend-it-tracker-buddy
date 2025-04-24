
import { useLocation, useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';

const PageSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMoneyTracker = location.pathname === '/';

  const handleSwitch = (checked: boolean) => {
    navigate(checked ? '/' : '/budget');
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-gray-200/20">
      <span className={`text-sm ${!isMoneyTracker ? 'text-gray-500' : ''}`}>Money Tracker</span>
      <Switch
        checked={isMoneyTracker}
        onCheckedChange={handleSwitch}
      />
      <span className={`text-sm ${isMoneyTracker ? 'text-gray-500' : ''}`}>Budget</span>
    </div>
  );
};

export default PageSwitcher;
