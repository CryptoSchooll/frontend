import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"

const Tasks = () => {
  return (
    <div className="mt-30">
      <Dialog>
        <DialogTrigger asChild>
          <button>Share</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2"></div>
            <button className="px-3" type="submit">
              <span className="sr-only">Copy</span>
            </button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button type="button">Close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Tasks
