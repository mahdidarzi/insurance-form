"use client";

import { Modal } from "@/app/components/molecules";
import { AddressList, CarInfoCard, FormErrorMessage, GeneralHeader, OwnerInfoForm } from "./components/Pages/insuranceForm";
import { GENERAL_CONTENT } from "./components/general";
import { useOwnerInfo } from "./hooks/useOwnerInfo";

export default function Home() {
  const { register, handleSubmit, submitForm, errors, addresses,
    selectedId, modalOpen, openModal, closeModal, handleRemove, confirmDelete, handleChoose, handleSelect, mode, isSubmitting, showErrorModal, watchedNationalId, watchedPhone, closeErrorModal,
    setSelectedId
  } = useOwnerInfo();

  return (
    <div>
      <main className="w-full max-w-4xl">
        <GeneralHeader title={GENERAL_CONTENT.BIMENAME_DETAIL} />
        <CarInfoCard />
        <GeneralHeader title={GENERAL_CONTENT.CAR_DETAIL} className='mt-8' />
        <OwnerInfoForm
          addresses={addresses}
          selectedId={selectedId}
          onOpenModal={openModal}
          onSubmit={submitForm}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
          register={register}
          watchedNationalId={watchedNationalId}
          watchedPhone={watchedPhone}
        />
        <Modal
          primaryButtonTitle={GENERAL_CONTENT.ERROR_PRIMARY_ACTION}
          secondaryButtonTitle={GENERAL_CONTENT.ERROR_SECONDARY_ACTION}
          onPrimaryButtonClick={handleSubmit(submitForm)}
          onSecondaryButtonClick={closeErrorModal}
          disabledConfirm={isSubmitting}
          hasLoading={isSubmitting}
          hasHeader={false} onClose={closeErrorModal} isOpen={showErrorModal}  >
          <FormErrorMessage />
        </Modal>
        <Modal
          title={mode === 'confirm-delete' ? 'تایید حذف آدرس' : 'انتخاب آدرس'}
          isOpen={modalOpen}
          onClose={mode === 'address-list' ? () => {
            setSelectedId('');
            closeModal()
          } : closeModal}
          hasSingleButton={mode === 'address-list'}
          singleButtonTitle="انتخاب"
          onSingleButtonClick={handleChoose}
          disabledConfirm={mode === 'address-list' ? !selectedId : false}
          hasHeader
          primaryButtonTitle="حذف"
          secondaryButtonTitle="بازگشت"
          onPrimaryButtonClick={confirmDelete}
          onSecondaryButtonClick={closeModal}
        >
          <AddressList
            mode={mode}
            addresses={addresses}
            selectedId={selectedId}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            setSelectedId={setSelectedId}
          />
        </Modal>
      </main>
    </div>
  );
}