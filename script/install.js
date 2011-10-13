console.info("Building webkit_server executable. This could take a while...");

require("child_process")
  .exec("vendor/webkit_server/build.sh", function(error, stdout, stderr) {
    if (error) {
      throw error;
    }

    if (stderr) {
      console.error(stderr);
    }
  });
