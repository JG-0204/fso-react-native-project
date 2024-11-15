import { format } from 'date-fns';

const formatDate = (date) => format(new Date(date), 'dd.LL.yyyy');

export default formatDate;
