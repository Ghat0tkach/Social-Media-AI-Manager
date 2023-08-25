function DallEComponent(prompt){
    const [form, setForm] = useState({
        prompt:`${prompt}`,
        photo: '',
      });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (form.prompt) {
          try {
            setGeneratingImg(true);
            const response = await fetch('http://localhost:8000/api/v1/dalle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt: form.prompt,
              }),
            });
    
            const data = await response.json();
            setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            
          } catch (err) {
            alert(err);
          } finally {
            setGeneratingImg(false);
          }
        } else {
          alert('Please provide proper prompt');
        }
      };
      useEffect(() => {
        const timeoutId = setTimeout(() => {
          generateImage({ prompt });
        }, 30000); // 30 seconds
      
        return () => clearTimeout(timeoutId); // Clear the timeout on unmount
      }, [prompt]);
    return(
    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
    {generatingImg?<Loader/>:
      <img
          src={form.photo}
          alt={form.prompt}
        className="w-full h-full object-contain"
      />}

    </div>)
  }
