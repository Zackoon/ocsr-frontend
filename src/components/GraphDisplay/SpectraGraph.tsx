import { Card, Text} from "@mantine/core";
import { useAppContext } from "../AppLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

// Create chart data from wavelengths and coneResponses
const createChartData = (wavelengths: number[], coneResponses: {
    coneResponse1: number[];
    coneResponse2: number[];
    coneResponse3: number[];
    coneResponse4: number[];
  }) => {
    return wavelengths.map((wavelength, index) => ({
      wavelength,  // X-axis value
      sResponse: coneResponses.coneResponse1[index], // Y-value for S Cone
      mResponse: coneResponses.coneResponse2[index], // Y-value for M Cone
      lResponse: coneResponses.coneResponse3[index], // Y-value for L Cone
      qResponse: coneResponses.coneResponse4[index], // Y-value for Q Cone
    }));
};

export default function GraphDisplay() {
    const { ocsDataArray, selectedEntryIndex } = useAppContext();

    const selectedIndex = selectedEntryIndex !== null ? selectedEntryIndex : 0;
    const ocsData = ocsDataArray[selectedIndex];
    console.log("selected index:", selectedIndex);
    console.log("ocs data:", ocsData);

    const data = ocsData ? createChartData(ocsData.wavelengths, ocsData.coneResponses) : [];
    
    return (
        <div>
            {/* <DropdownButton open={open} setOpen={setOpen} leftDropdown={false}></DropdownButton> */}
            {/* <DropdownContent open={true} width={400}> */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="lg" mb="md">Cone Responses to Wavelengths</Text>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="wavelength" label={{ value: 'Wavelength (nm)', position: 'insideBottomRight', offset: -5 }} />
                        <YAxis label={{ value: 'Response', angle: -90, position: 'insideLeft' }} />
                        {/* <Tooltip
                            position="bottom"
                            opened
                            label="Tooltip"
                            offset={{ mainAxis: 50}}
                        /> */}
                        <Legend />
                        <Line type="monotone" dataKey="sResponse" stroke="#8884d8" name="Smallest Peak Response" />
                        <Line type="monotone" dataKey="mResponse" stroke="#82ca9d" name="Medium Peak Response" />
                        <Line type="monotone" dataKey="lResponse" stroke="#ff7300" name="Largest Peak Response" />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
            {/* </DropdownContent> */}
        </div>
    )
}