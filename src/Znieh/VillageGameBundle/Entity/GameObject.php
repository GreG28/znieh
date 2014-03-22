<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * GameObject
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\VillageGameBundle\Entity\GameObjectRepository")
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 * @ExclusionPolicy("all")
 */
abstract class GameObject
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Expose
     */
    protected $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    protected $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="points", type="integer", nullable=true)
     */
    protected $points;


    /**
     * @ORM\ManyToOne(targetEntity="Step", cascade={"persist"})
     */
    private $step;

    /**
     * @var array
     *
     * @ORM\Column(name="effects", type="array", nullable=true)
     * @Expose
     */
    protected $effects;

    /**
     * @var array
     *
     * @ORM\Column(name="costs", type="array", nullable=true)
     */
    protected $costs;

    private $unlocked;
    private $unlockable;

    public function __construct()
    {
        $this->effects = array();
    }

    public function getImg()
    {
        $max = 0;
        $majorEffect = '';
        foreach ($this->effects as $key => $value) {
            if ($value > $max) {
                $max = $value;
                $majorEffect = $key;
            }
        }
        switch ($majorEffect) {
            case 'vie':
                return 'life';
            case 'parade':
                return 'dodge';
            case 'defense':
                return 'defense';
            case 'precision':
                return 'precision';
            case 'agilite':
                return 'agility';
            case 'intelligence':
                return 'intelligence';
            case 'penetration':
                return 'penetration';
            case 'force':
                return 'strength';
            default:
                break;
        }
        return 'agility';
    }

    /**
     * Set unlocked
     *
     * @param boolean $unlocked
     * @return GameObject
     */
    public function setUnlocked($unlocked)
    {
        $this->unlocked = $unlocked;

        return $this;
    }

    /**
     * Get unlocked
     *
     * @return boolean
     */
    public function getUnlocked()
    {
        return $this->unlocked;
    }

    /**
     * Set unlockable
     *
     * @param boolean $unlockable
     * @return GameObject
     */
    public function setUnlockable($unlockable)
    {
        $this->unlockable = $unlockable;

        return $this;
    }

    /**
     * Get unlockable
     *
     * @return boolean
     */
    public function getUnlockable()
    {
        return $this->unlockable;
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return GameObject
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return GameObject
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set points
     *
     * @param integer $points
     * @return GameObject
     */
    public function setPoints($points)
    {
        $this->points = $points;

        return $this;
    }

    /**
     * Get points
     *
     * @return integer
     */
    public function getPoints()
    {
        return $this->points;
    }

    /**
     * Set step
     *
     * @param \Znieh\VillageGameBundle\Entity\Step $step
     * @return GameObject
     */
    public function setStep(\Znieh\VillageGameBundle\Entity\Step $step = null)
    {
        $this->step = $step;

        return $this;
    }

    /**
     * Get step
     *
     * @return \Znieh\VillageGameBundle\Entity\Step
     */
    public function getStep()
    {
        return $this->step;
    }

    public function addEffect($key, $effect)
    {
        if (!in_array($effect, $this->effects, true)) {
            $this->effects[$key] = $effect;
        }

        return $this;
    }

    public function removeEffect($effect)
    {
        if (false !== $key = array_search($effect, $this->effects, true)) {
            unset($this->effects[$key]);
            $this->effects = array_values($this->effects);
        }

        return $this;
    }

    public function getEffects()
    {
        return $this->effects;
    }

    public function setEffects(array $effects)
    {
        $this->effects = array();

        foreach ($effects as $key => $effect) {
            $this->addEffect($key, $effect);
        }

        return $this;
    }

    public function addCost($key, $cost)
    {
        if (!in_array($cost, $this->costs, true)) {
            $this->costs[$key] = $cost;
        }

        return $this;
    }

    public function removeCost($cost)
    {
        if (false !== $key = array_search($cost, $this->costs, true)) {
            unset($this->costs[$key]);
            $this->costs = array_values($this->costs);
        }

        return $this;
    }

    public function getCosts()
    {
        return $this->costs;
    }

    public function setCosts(array $costs)
    {
        $this->costs = array();

        foreach ($costs as $key => $cost) {
            $this->addCost($key, $cost);
        }

        return $this;
    }
}
