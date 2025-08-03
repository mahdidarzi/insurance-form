import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface AddressItem {
  id: string;
  name: string;
  details: string;
}

const schema = z.object({
  nationalId: z
    .string()
    .min(1, { message: 'وارد کردن کدملی الزامی است.' })
    .refine((val) => /^[0-9]{10}$/.test(val), {
      message: 'کدملی وارد شده معتبر نیست.',
    }),
  phone: z
    .string()
    .min(1, { message: 'وارد کردن شماره تلفن همراه الزامی است.' })
    .refine((val) => /^(0?9\d{9})$/.test(val), {
      message: 'شماره تلفن همراه معتبر نیست.',
    }),
});

export type FormData = z.infer<typeof schema>;

export const useOwnerInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nationalId: '',
      phone: '',
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<AddressItem[]>();
  const [selectedId, setSelectedId] = useState<string>('');
  const [mode, setMode] = useState<'address-list' | 'confirm-delete'>('address-list');
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const watchedNationalId = watch('nationalId');
  const watchedPhone = watch('phone');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://front-end-task.bmbzr.ir/my-addresses/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': 'connect.sid=s%3AMSHqW055L1x6v_yZvHrCnfEtiPCDqOk2.Vi%2FeqDS4pcwV05BaghaNfkvKdGB9OcMMBG00LxY9QQ8',
          },
          credentials: 'include',
        });

        const data = await res.json();
        console.log('Fetched data:', data);
        setAddresses(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      reset(JSON.parse(savedData));
    }
    const savedAddressId = localStorage.getItem('selectedAddressId');
    if (savedAddressId) {
      setSelectedId(savedAddressId);
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('formData', JSON.stringify(value));
    });
    localStorage.setItem('selectedAddressId', selectedId || '');
    return () => subscription.unsubscribe();
  }, [watch, selectedId]);

  const openModal = () => {
    setModalOpen(true);
    setMode('address-list');
    if (!window.history.state?.modal) {
      window.history.pushState({ modal: true, step: 'address-list' }, '');
    } else if (window.history.state?.step !== 'address-list') {
      window.history.pushState({ modal: true, step: 'address-list' }, '');
    }
  };

  const closeModal = () => {
    if (mode === 'confirm-delete') {
      window.history.back();
      return;
    }
    if (window.history.state?.modal) {
      window.history.back();
    } else {
      setModalOpen(false);
      setMode('address-list');
      setPendingDeleteId(null);
    }
  };

  const handleRemove = (e: React.MouseEvent, id: string) => {
    setPendingDeleteId(id);
    setMode('confirm-delete');
    window.history.pushState({ modal: true, step: 'confirm-delete' }, '');
  };

  const confirmDelete = () => {
    if (!pendingDeleteId) return;

    setAddresses((prev) => {
      const filtered = prev?.filter((item) => item.id !== pendingDeleteId);
      return filtered;
    });

    setPendingDeleteId(null);
    if (mode === 'confirm-delete') {
      window.history.back();
    } else {
      setMode('address-list');
    }
  };

  const handleChoose = () => {
    closeModal();
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const closeErrorModal = () => {
    if (window.history.state?.errorModal) {
      window.history.back();
    } else {
      setShowErrorModal(false);
    }
  };

  const submitForm = async (data: FormData) => {
    if (!selectedId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('https://front-end-task.bmbzr.ir/order/completion/www', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'connect.sid=s%3AMSHqW055L1x6v_yZvHrCnfEtiPCDqOk2.Vi%2FeqDS4pcwV05BaghaNfkvKdGB9OcMMBG00LxY9QQ8',
        },
        credentials: 'include',
        body: JSON.stringify({
          nationalId: data.nationalId,
          phoneNumber: data.phone,
          addressId: selectedId,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      const result = await response.json();
      console.log('Success:', result);
      closeErrorModal();
    } catch (err) {
      console.error('Error submitting:', err);
      setShowErrorModal(true);
      if (!window.history.state?.errorModal) {
        window.history.pushState({ errorModal: true }, '');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state as { modal?: boolean; step?: string; errorModal?: boolean } | null;

      if (state?.modal) {
        setModalOpen(true);
        setMode(state.step === 'confirm-delete' ? 'confirm-delete' : 'address-list');
      } else if (state?.errorModal) {
        setShowErrorModal(true);
      } else {
        setModalOpen(false);
        closeErrorModal();
        setMode('address-list');
        setPendingDeleteId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    register,
    handleSubmit,
    submitForm,
    errors,
    addresses,
    selectedId,
    setSelectedId,
    modalOpen,
    openModal,
    closeModal,
    handleRemove,
    confirmDelete,
    handleChoose,
    handleSelect,
    mode,
    pendingDeleteId,
    isSubmitting,
    showErrorModal,
    setShowErrorModal,
    watchedNationalId,
    watchedPhone,
    closeErrorModal    
  };
};
