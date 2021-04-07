/*  ./components/admin/chart/Acoustic.js     */
export const Chart = () => {
    
  return (

<>

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600 text-center">Background noise in your work area</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/horizontal/tabAcousticBackgroundnoiseinyourworkarea" frameBorder="0" />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-full md:w-1/2 p-3">
                    
                    <div className="bg-white border rounded shadow">
                        <div className="border-b p-3">
                            <h5 className="font-bold uppercase text-gray-600 text-center">Do you experience noise from mechanical or electrical equipment</h5>
                        </div>
                        <div className="p-5">
                             <div className="relative" style={{width: '100%', height: '500px'}}>
                                <iframe className="absolute inset-0 w-full h-full" src="/chart/pie/tabAcousticDoyouexperiencenoisefrommechanicalorelectricalequipment" frameBorder="0" />
                            </div>
                        </div>
                    </div>
                    
                </div>

</>

  );
};