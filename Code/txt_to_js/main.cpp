/* compile this with c++11
   copy xlxs to datastore.txt and run
*/

#include <iostream>
#include <fstream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main()
{
    ifstream f("datastore.txt");
    ofstream of("local_files.js");
    string line;
    vector<vector<string>> store;
    while(!f.eof()){
    vector<string> dataset;
        getline(f, line);
        istringstream block(line);
        string name;
        string addr1;
        string addr2;

        string dataname = "";
        while(name.find("https") == string::npos){
            block >> name;
            if(name.find("https") != string::npos){
                addr1 = name;

                break;
            }
            if(name.size() == 0)
                break;

            dataname += name + " ";
        }
        dataset.push_back(dataname);


        dataset.push_back(addr1);
        block >> addr2;
        dataset.push_back(addr2);
        store.push_back(dataset);
    }
    sort(store.begin(), store.end());

    of << "function Dataset(name, kml, json, meta) {" << endl;
    of << "\tthis.name = name;" << endl;
    of << "\tthis.kml = kml;" << endl;
    of << "\tthis.json = json;" << endl;
    of << "\tthis.meta = meta;" << endl;
    of << "}" << endl;
    of << "function read_store() {"<<endl;
    of << "\tvar list = {" << endl;

    for(auto x:store){
        if(x[0].find("kml") != string::npos){

            x[0] = x[0].substr(0, x[0].find("(kml)"));
            string nospace = x[0];
            nospace.erase(std::remove(nospace.begin(), nospace.end(), ' '),
               nospace.end());

            of << "\t\t\t\"" + nospace + "\"" << ": new Dataset(" << endl;
            of << "\t\t\t\"" + x[0] + "\"," << endl;
            of << "\t\t\t\"" + x[1] + "\"," << endl;
            of << "\t\t\t\"" << "\"," << endl;
            of << "\t\t\t\"" + x[2] + "\"," << endl;
            of << "\t\t)," << endl;
        }else
        if(x[0].find("geojson") != string::npos){
            x[0] = x[0].substr(0, x[0].find("(geojson)"));
            string nospace = x[0];
            nospace.erase(std::remove(nospace.begin(), nospace.end(), ' '),
               nospace.end());

            of << "\t\t\t\"" + nospace + "\"" << ": new Dataset(" << endl;
            of << "\t\t\t\"" + x[0] + "\"," << endl;
            of << "\t\t\t\"" << "\"," << endl;
            of << "\t\t\t\"" + x[1] + "\"," << endl;
            of << "\t\t\t\"" + x[2] + "\"," << endl;
            of << "\t\t)," << endl;
        }
    }
    of <<"\t};"<<endl;
    of << "    return list;" << endl;
    of <<"}"<<endl;
    return 0;
}
