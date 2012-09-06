using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace Asteroids
{
    class Ship
    {
        public Model Model;
        public Matrix[] Transforms;

        //Position of the model in world space
        public Vector3 Position = Vector3.Zero;

        //Velocity of the model, apploed each frame to the model's position
        public Vector3 Velocity = Vector3.Zero;
        private const float VelocityScale = 5.0f;

        public bool isActive = true;

        public Matrix RotationMatrix = Matrix.CreateRotationX(MathHelper.PiOver2);
        private float rotation;
        public float Rotation
        {
            get { return rotation; }
            set
            {
                float newVal = value;
                while (newVal >= MathHelper.TwoPi)
                {
                    newVal -= MathHelper.TwoPi;
                }
                while (newVal < 0)
                {
                    newVal += MathHelper.TwoPi;
                }

                if (rotation != newVal)
                {
                    rotation = newVal;
                    RotationMatrix = Matrix.CreateRotationX(MathHelper.PiOver2) * Matrix.CreateRotationZ(rotation);
                }
            }
        }

        public void Update(GamePadState controllerState)
        {
            // Rotate the model using the left thumbstick, and scale it down.
            Rotation -= controllerState.ThumbSticks.Left.X * 0.10f;

            // Finally, add this vector to our velocity
            Velocity += RotationMatrix.Forward * VelocityScale * controllerState.Triggers.Right;
        }
    }
}
