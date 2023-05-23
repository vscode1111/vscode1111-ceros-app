import BigNumber from 'bignumber.js';
import { useTransactionAction } from 'modules/common';
import { useState, useCallback } from 'react';
import { t } from 'modules/i18n';
import { DepositFormValues, DepositForm } from './DepositForm';
import { yieldConverterDeposit } from '../../../actions/YieldConverter/yieldConverterDeposit';
import { ActionForm } from '../../ActionForm';

export function StabilityPoolDepositForm(): JSX.Element | null {
  const [depositAmount, setDepositAmount] = useState('');

  const { loading, data, error, executeAction } = useTransactionAction(
    yieldConverterDeposit,
  );

  const handleSubmit = useCallback(
    (values: DepositFormValues) => {
      setDepositAmount(values.depositAmount);
      executeAction(new BigNumber(values.depositAmount));
    },
    [setDepositAmount, executeAction],
  );

  return (
    <ActionForm
      Form={DepositForm}
      loading={loading}
      data={data}
      error={error}
      amount={depositAmount}
      completedTitle={t('modal.completed.deposit-title')}
      onSubmit={handleSubmit}
    />
  );
}
