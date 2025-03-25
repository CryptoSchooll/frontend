import type { FC } from "react"

interface ConfirmModalProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-md bg-white p-4 shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button className="rounded bg-gray-300 px-4 py-2" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
