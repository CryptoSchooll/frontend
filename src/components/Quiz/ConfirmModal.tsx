import type { FC } from "react"

import { motion } from "framer-motion"

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-xl bg-gradient-to-b from-gray-900 to-purple-950 p-5 shadow-[0_0_25px_rgba(139,92,246,0.3)]"
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {/* Декоративный элемент */}
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-purple-500/10 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-indigo-500/10 blur-lg"></div>
        
        {/* Текст сообщения */}
        <p className="mb-6 text-center text-lg text-white">{message}</p>
        
        {/* Кнопки действий */}
        <div className="flex gap-3">
          <motion.button 
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 py-3 font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCancel}
          >
            Отмена
          </motion.button>
          <motion.button
            className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 py-3 font-medium text-white shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
          >
            Подтвердить
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default ConfirmModal
