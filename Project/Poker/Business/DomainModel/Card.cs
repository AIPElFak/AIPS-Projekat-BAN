using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.DomainModel
{
    public class Card
    {
        public int number { get; set; }
        public int sign { get; set; }

        public string getString()
        {
            string retVal = "";

            switch (number)
            {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    retVal = number.ToString();
                    break;
                case 11:
                    retVal = "jack";
                    break;
                case 12:
                    retVal = "queen";
                    break;
                case 13:
                    retVal = "king";
                    break;
                case 1:
                    retVal = "ace";
                    break;
            }

            retVal += "_of_";

            switch (sign)
            {
                case 1:
                    retVal += "clubs";
                    break;
                case 2:
                    retVal += "diamonds";
                    break;
                case 3:
                    retVal += "hearts";
                    break;
                case 4:
                    retVal += "spades";
                    break;
            }

            return retVal;
        }

        public string getStringForLib()
        {
            string retVal = "";

            switch (number)
            {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    retVal = number.ToString();
                    break;
                case 11:
                    retVal = "j";
                    break;
                case 12:
                    retVal = "q";
                    break;
                case 13:
                    retVal = "k";
                    break;
                case 1:
                    retVal = "a";
                    break;
            }

            switch (sign)
            {
                case 1:
                    retVal += "c";
                    break;
                case 2:
                    retVal += "d";
                    break;
                case 3:
                    retVal += "h";
                    break;
                case 4:
                    retVal += "s";
                    break;
            }

            return retVal;
        }
    }
}
