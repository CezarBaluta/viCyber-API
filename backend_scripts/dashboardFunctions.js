var fs = require("fs");
var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.PUBLICKEYIMAGEKIT,
    privateKey : process.env.PRIVATEKEYIMAGEKIT,
    urlEndpoint : "https://ik.imagekit.io/vicyber"
  });
  
  async function generatePhotoLink(photo){
    var photoLink = await imagekit.upload({
      file : photo, 
      fileName : "my_file_name.jpg", 
    });
  return photoLink;
}

  async function getLink(photo) {
    return new Promise(async resolve => {
    await fs.readFile(process.env.TMPPATH+ photo.filename, await async function(err, data) {
      var photoFile;
      if (err) throw err // Fail if the file can't be read.
      else{
        photoFile = data;
      }
      link =  await generatePhotoLink(photoFile);
      resolve(link.url)

    });
    await fs.unlink(process.env.TMPPATH + photo.filename, (err) => {
      if (err) {
          console.error(err);
          return;
      }
    });
  });
  }

module.exports = {
    generateId: async function generateId(Model) {
        const array = await Model.find({});
        if(array === undefined) return 0;
        return array.length;
    },
    generatePhotoLink : generatePhotoLink ,
    getLink: getLink,
    
  };
  