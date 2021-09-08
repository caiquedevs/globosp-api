import { format, getDaysInMonth } from "date-fns";
import addMonths from "date-fns/addMonths";
import { ptBR } from "date-fns/locale";

const dateGenerator = () => {
  const prevOrNextMonth = (count = 0) => {
    const date = addMonths(new Date(), count);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  const dayNow = () => {
    const day = format(new Date(), "dd");
    return Number(day);
  };

  return { prevOrNextMonth, dayNow };
};

export default dateGenerator;
