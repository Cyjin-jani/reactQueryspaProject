import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';

test('filter appointments by availability', async () => {
  const { result, waitFor } = renderHook(useAppointments, {
    wrapper: createQueryClientWrapper(),
  });

  // wait for the appointments to populate
  await waitFor(() => Object.keys(result.current.appointments).length > 0);

  const filteredAppointmentsLength = Object.keys(result.current.appointments)
    .length;

  // set to show all appointments
  // hook을 변경하기 위한 act
  act(() => result.current.setShowAll(true));

  // wait for the appointments to show more data than when filtered
  await waitFor(
    () =>
      Object.keys(result.current.appointments).length >
      filteredAppointmentsLength,
  );
});
