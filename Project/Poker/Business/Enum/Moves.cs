using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Enum
{
    public class Moves
    {
        public enum Type
        {
            SmallBlind,
            BigBlind,
            Check,
            Call,
            Raise,
            Fold,
            Win,
            SetTableCard
        }
    }
}
