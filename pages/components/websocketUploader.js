const clientUploader = async (io, file, progress) => {
   let currentSlice = 0,
      sliceSize = (1024 * 1024) / 3;
   const totalSlices = Math.ceil(file.size / sliceSize);
   let slices = totalSlices;
   //  console.log(slices);
   const getNextSlice = () => {
      let start = currentSlice * sliceSize;
      let end = Math.min((currentSlice + 1) * sliceSize, file.size);
      ++currentSlice;

      return file.slice(start, end);
   };
   console.log("sending: ", file);
   const sendNextSlice = () => {
      io.emit(
         "fileSlicePartial",
         {
            fileName: file.name,
            currentSlice: slices == 0 ? "done" : currentSlice,
            slice: slices == 0 ? null : getNextSlice(),
         },
         () => {
            if (slices > 0) {
               progress((totalSlices - slices) / totalSlices);
            }
            if (slices >= 0) {
               sendNextSlice();
               slices--;
               //    console.log("Sending slice " + currentSlice);
            } else {
               progress(1);
               //    console.log("done");
            }
         }
      );
   };
   sendNextSlice();
   return true;
};

export default clientUploader;
